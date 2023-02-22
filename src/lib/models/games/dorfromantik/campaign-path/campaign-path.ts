import {BoxNode, Edge, HeartNode, StartNode} from './node';
import type {Node} from './node';
import {DorfromantikCampaignPathAchievement} from '../achievement';

export class DorfromantikCampaignPath {
  private startNode: StartNode;

  constructor() {
    this.startNode = this.createPath();
  }

  private createPath(): StartNode {
    const nodes = this.createNodes();

    this.createAndLinkEdge(nodes.start, 2, nodes.box1);
    this.createAndLinkEdge(nodes.box1, 5, nodes.box2);
    this.createAndLinkEdge(nodes.box2, 4, nodes.warehouse);
    this.createAndLinkEdge(nodes.box2, 4, nodes.circus);
    this.createAndLinkEdge(nodes.warehouse, 6, nodes.grainTunnel);
    this.createAndLinkEdge(nodes.warehouse, 6, nodes.signalman);
    this.createAndLinkEdge(nodes.circus, 6, nodes.signalman);
    this.createAndLinkEdge(nodes.circus, 6, nodes.fallowDeer);
    this.createAndLinkEdge(nodes.grainTunnel, 3, nodes.heartLeft);
    this.createAndLinkEdge(nodes.signalman, 3, nodes.heartCenter);
    this.createAndLinkEdge(nodes.fallowDeer, 3, nodes.heartRight);
    this.createAndLinkEdge(nodes.heartLeft, 4, nodes.villageTunnel);
    this.createAndLinkEdge(nodes.heartCenter, 4, nodes.shephard);
    this.createAndLinkEdge(nodes.heartRight, 4, nodes.castle);
    this.createAndLinkEdge(nodes.villageTunnel, 10, nodes.forestTunnel);
    this.createAndLinkEdge(nodes.shephard, 10, nodes.hill);
    this.createAndLinkEdge(nodes.castle, 10, nodes.farmYard);
    this.createAndLinkEdge(nodes.forestTunnel, 10, nodes.cloud);
    this.createAndLinkEdge(nodes.hill, 10, nodes.cloud);
    this.createAndLinkEdge(nodes.farmYard, 10, nodes.cloud);

    return nodes.start;
  }
  private createAndLinkEdge(node1: Node, weight: number, node2: Node) {
    const edge = new Edge()
      .setNodes(node1, node2)
      .setWeight(weight);

    node1.addEdge(edge);
    node2.addEdge(edge);
  }

  private createNodes(): Record<'start', StartNode> & Record<`box${1 | 2}`|`heart${'Left'|'Center'|'Right'}`|DorfromantikCampaignPathAchievement, Node> {
    return {
      start: new StartNode(),
      box1: new BoxNode(undefined),
      box2: new BoxNode(undefined),
      heartLeft: new HeartNode(),
      heartCenter: new HeartNode(),
      heartRight: new HeartNode(),
      ...Object.values(DorfromantikCampaignPathAchievement)
        .reduce(
          (prev, curr) => ({
            ...prev,
            [curr]: new BoxNode(curr),
          }),
          {} as Record<DorfromantikCampaignPathAchievement, Node>,
        ),
    }
  }
}
